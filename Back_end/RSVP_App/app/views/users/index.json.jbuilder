json.array!(@users) do |user|
  json.extract! user, :id, :firstname, :lastname, :email, :username, :password, :password_digest, :reset_token, :picture_url, :auth_token
  json.url user_url(user, format: :json)
end
