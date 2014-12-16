json.array!(@events) do |event|
  json.extract! event, :id, :title, :public_description, :private_description, :date, :time, :location, :price, :max_attendances, :event_picture_url, :public_code, :private_code, :publico
  json.url event_url(event, format: :json)
end
