from datasets import load_dataset

import wandb

wandb.init(project="hackcrux-gemma-training", name="gemma-2b-finetune-run")

dataset = load_dataset("json", data_files="C:/Users/Ch_Kumar_Kartik/Coding Resources/Projects/Hackcrux_LNMIIT/dataset.json")

print(dataset.column_names)


from datasets import Dataset
import json

# Load JSON data (assuming the JSON structure includes a top-level "intents" key)
with open("dataset.json") as f:
    data = json.load(f)

# Convert to HuggingFace Dataset
dataset = Dataset.from_list(data["intents"])
print(dataset.column_names)  # Confirm keys like 'to', 'from', 'subject', etc.


def preprocess_function(examples):
    """
    Preprocess and tokenize structured email data for generation tasks.
    Input: 'to', 'from', 'subject', 'body'
    Target: structured metadata including event details and replies.
    """
    inputs = [
        f"To: {to} | From: {fro} | Subject: {subj} | Body: {body}"
        for to, fro, subj, body in zip(
            examples["to"],
            examples["from"],
            examples["subject"],
            examples["body"]
        )
    ]

    outputs = [
        f"Event Title: {event} | Urgency: {urgency} | Date: {date} | Time: {time} | Keyword: {keyword} | "
        f"Reply-To: {reply_to} | Reply-From: {reply_from} | Reply-Subject: {reply_subject} | Reply-Body: {reply_body}"
        for event, urgency, date, time, keyword, reply_to, reply_from, reply_subject, reply_body in zip(
            examples["event_title"],
            examples["urgency"],
            examples["date"],
            examples["time"],
            examples["keyword"],
            examples["reply_to"],
            examples["reply_from"],
            examples["reply_subject"],
            examples["reply_body"]
        )
    ]

    # Tokenizing inputs and outputs
    model_inputs = tokenizer(inputs, max_length=512, truncation=True, padding="max_length")
    labels = tokenizer(outputs, max_length=512, truncation=True, padding="max_length")

    # Set tokenized outputs as labels
    model_inputs["labels"] = labels["input_ids"]

    return model_inputs


    # Tokenizing inputs and outputs
    model_inputs = tokenizer(inputs, max_length=512, truncation=True, padding="max_length")
    labels = tokenizer(outputs, max_length=512, truncation=True, padding="max_length")

    # Setting labels for training
    model_inputs["labels"] = labels["input_ids"]

    return model_inputs

from transformers import AutoTokenizer

# Load tokenizer (change to match your model)
tokenizer = AutoTokenizer.from_pretrained("t5-small")

# Apply preprocessing (this removes original columns)
tokenized_dataset = dataset.map(preprocess_function, batched=True, remove_columns=dataset.column_names)

# 90/10 train-validation split
split_dataset = tokenized_dataset.train_test_split(test_size=0.1)

train_data = split_dataset["train"]
val_data = split_dataset["test"]

print("Train size:", len(train_data), "Validation size:", len(val_data))


from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

model_name = "google/gemma-2b-it"


bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype="float16",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4"
)


model = AutoModelForCausalLM.from_pretrained(model_name, quantization_config=bnb_config)
tokenizer = AutoTokenizer.from_pretrained(model_name)


tokenizer.pad_token = tokenizer.eos_token

from peft import get_peft_model, LoraConfig, TaskType

lora_config = LoraConfig(
    r=8,
    lora_alpha=32,
    lora_dropout=0.1,
    task_type=TaskType.CAUSAL_LM
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()


from transformers import TrainingArguments, Trainer

training_args = TrainingArguments(
    fp16=True,
    output_dir="./results",
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    num_train_epochs=10,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    logging_dir="./logs",
    logging_steps=10,
    remove_unused_columns=False
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_data,
    eval_dataset=val_data,
    tokenizer=tokenizer
)

trainer.train()


def generate_response(email):
    # Format the email as input for the model
    prompt = (
    f"Generate a professionally worded reply email.\n"
    f"- Reply-To\n"
    f"- Reply-From\n"
    f"- Reply Subject\n"
    f"- Reply Body\n\n"
    f"Email Details:\n"
    f"To: {email['to']}\n"
    f"From: {email['from']}\n"
    f"Subject: {email['subject']}\n"
    f"Body: {email['body']}\n\n"
    f"Extracted information\n"
    f"Extract the following structured information from the email:\n"
    f"- Event Title\n"
    f"- Urgency\n"
    f"- Event Date\n"
    f"- Event Time\n"
    f"- Keyword(s)\n"
)


    # Tokenize input and send it to GPU
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512).to("cuda")

    # Generate model output
    output = model.generate(**inputs, max_length=250)

    # Decode and return response
    return tokenizer.decode(output[0], skip_special_tokens=True)

# Example Email
email_sample = {
    "to": "relatives@smith.com",
      "from": "mike@smith.com",
      "subject": "To invite someone to a family reunion",
      "body": "Hi Everyone,\n\nJoin us for a family reunion on June 15, 2025, at 1:00 PM at Lakeview Park. RSVP by May 15!\n\nBest,\nMike",
}

print(generate_response(email_sample))


def generate_reply(email):
    # Format the email as input for the model
    prompt = (
    f"Generate a professionally worded reply email.\n"
    f"- Reply-To\n"
    f"- Reply-From\n"
    f"- Reply Subject\n"
    f"- Reply Body\n\n"
    f"Email Details:\n"
    f"To: {email['to']}\n"
    f"From: {email['from']}\n"
    f"Subject: {email['subject']}\n"
    f"Body: {email['body']}\n\n"
    )


    # Tokenize input and send it to GPU
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512).to("cuda")

    # Generate model output
    output = model.generate(**inputs, max_length=250)

    # Decode and return response
    return tokenizer.decode(output[0], skip_special_tokens=True)

# Example Email
email_sample = {
    "to": "relatives@smith.com",
      "from": "mike@smith.com",
      "subject": "To invite someone to a family reunion",
      "body": "Hi Everyone,\n\nJoin us for a family reunion on June 15, 2025, at 1:00 PM at Lakeview Park. RSVP by May 15!\n\nBest,\nMike",
}

print(generate_reply(email_sample))


trainer.save_model("hackcrux-gemma")
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("hackcrux-gemma")
# model.push_to_hub("kanakrajarora/hackcrux-gemma")

import torch

# Define save directory
save_directory = "C:/Users/Ch_Kumar_Kartik/Coding Resources/Projects/Hackcrux_LNMIIT/gemma-2b-finetuned-v2"

# Save the model and tokenizer
model.save_pretrained(save_directory)
tokenizer.save_pretrained(save_directory)

# If using CUDA, move the model to CPU before saving (optional, for safety)
torch.save(model.state_dict(), f"{save_directory}/model_weights.pth")

print(f"Model and tokenizer saved in {save_directory}")