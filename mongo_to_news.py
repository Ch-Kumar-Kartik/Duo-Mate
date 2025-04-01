import feedparser
from pymongo import MongoClient

# MongoDB connection setup
client = MongoClient('mongodb+srv://bhaveshshastri6:4t0xgsyBzVrujAlz@duomate.kagwiar.mongodb.net/?retryWrites=true&w=majority&appName=duoMate')
db = client['intents']
mails_collection = db['mails']
news_collection = db['news']

def fetch_google_news():
    # Get the latest event title from the mails collection
    latest_doc = mails_collection.find_one(sort=[('_id', -1)])
    if not latest_doc or 'event_title' not in latest_doc:
        print("No event title found in the database.")
        return
    
    keyword = latest_doc['event_title']
    # Format the search query
    search_query = '+'.join(keyword.strip().split())
    url = f"https://news.google.com/rss/search?q={search_query}&hl=en-US&gl=US&ceid=US:en"

    # Parse the RSS feed
    feed = feedparser.parse(url)

    # Check if entries exist
    if not feed.entries:
        print(f"No news articles found for keyword: '{keyword}'")
        return

    print(f"\n📰 Top 5 news articles for '{keyword}':\n")
    
    # Prepare news articles for storage
    news_articles = []
    for i, entry in enumerate(feed.entries[:5], start=1):
        article = {
            'title': entry.title,
            'link': entry.link
        }
        news_articles.append(article)
        print(f"{i}. {entry.title}")
        print(f"   👉 {entry.link}\n")

    # Insert articles into news collection
    if news_articles:
        news_collection.insert_many(news_articles)
        print(f"Successfully stored {len(news_articles)} articles in the database.")

def main():
    print(">>> fetch_google_news()")
    fetch_google_news()

if __name__ == "_main_":
    main()