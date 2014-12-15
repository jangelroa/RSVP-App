json.array!(@event_news) do |event_news|
  json.extract! event_news, :id, :title, :body
  json.url event_news_url(event_news, format: :json)
end
