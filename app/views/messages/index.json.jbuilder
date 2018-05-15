json.array! @new_message do |message|
	json.user_name  message.user.name
	json.content  message.content
	json.image message.image.url
	json.created_at  message.created_at
	json.id message.id
end
