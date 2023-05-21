from django.db.models import Model, BigIntegerField, BooleanField, CharField, TextField, JSONField, ManyToManyField, DateTimeField
from telegram_bot.managers import TelegramBotManager, TelegramBotCommandManager, TelegramBotUserManager

import user.models as UserModels

from django.conf import settings
import pytz


class TelegramBotUser(Model):
	user_id = BigIntegerField()
	username = CharField(max_length=32)
	is_allowed = BooleanField(default=False)
	date_activated = DateTimeField(auto_now_add=True)

	objects = TelegramBotUserManager()

	class Meta:
		db_table = 'telegram_bot_user'

	def get_date_activated(self) -> str:
		return self.date_activated.astimezone(
			pytz.timezone(settings.TIME_ZONE)
		).strftime('%d %B %Y г. %H:%M')


class TelegramBotCommand(Model):
	name = CharField(max_length=255)
	command = CharField(max_length=32, null=True)
	callback = CharField(max_length=64, null=True)
	message_text = TextField()
	keyboard = JSONField()

	objects = TelegramBotCommandManager()

	class Meta:
		db_table = 'telegram_bot_command'


class TelegramBot(Model):
	name = CharField(max_length=32, unique=True)
	api_token = CharField(max_length=50, unique=True)
	is_private = BooleanField(default=True)
	is_running = BooleanField(default=False)
	is_stopped = BooleanField(default=True)
	commands = ManyToManyField(TelegramBotCommand, related_name='commands')
	users = ManyToManyField(TelegramBotUser, related_name='users')
	date_added = DateTimeField(auto_now_add=True)

	objects = TelegramBotManager()

	class Meta:
		db_table = 'telegram_bot'

	def get_date_added(self) -> str:
		return self.date_added.astimezone(
			pytz.timezone(settings.TIME_ZONE)
		).strftime('%d %B %Y г. %H:%M')

	def duplicate(self, user: 'UserModels.User', api_token: str, is_private: bool) -> 'TelegramBot':
		duplicated_telegram_bot = TelegramBot.objects.add_telegram_bot(user=user, api_token=api_token, is_private=is_private)
		for telegram_bot_command in self.commands.all():
			TelegramBotCommand.objects.add_telegram_bot_command(
				telegram_bot=duplicated_telegram_bot,
				name=telegram_bot_command.name,
				command=telegram_bot_command.command,
				callback=telegram_bot_command.callback,
				message_text=telegram_bot_command.message_text,
				keyboard=telegram_bot_command.keyboard
			)

		return duplicated_telegram_bot

	def delete(self) -> None:
		for telegram_bot_command in self.commands.all():
			telegram_bot_command.delete()

		for telegram_bot_user in self.users.all():
			telegram_bot_user.delete()

		super().delete()