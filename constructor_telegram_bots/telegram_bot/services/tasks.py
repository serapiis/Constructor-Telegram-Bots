from celery import shared_task

from telegram_bot.models import TelegramBot

from telegram_bot.services import ConstructorTelegramBot
from telegram_bot.services import UserTelegramBot

from threading import Thread
from typing import Union
from sys import platform


@shared_task
def stop_telegram_bot(telegram_bot_id: int) -> None:
	telegram_bot: TelegramBot = TelegramBot.objects.get(id=telegram_bot_id)
	telegram_bot.is_running = False
	telegram_bot.save()

async def start_telegram_bot__(telegram_bot: Union[ConstructorTelegramBot, UserTelegramBot]) -> None:
	await telegram_bot.setup()
	await telegram_bot.start()

def start_telegram_bot_(telegram_bot: Union[ConstructorTelegramBot, UserTelegramBot]) -> None:
	telegram_bot.loop.run_until_complete(start_telegram_bot__(telegram_bot))
	telegram_bot.loop.stop()

@shared_task
def start_telegram_bot(telegram_bot_id: int) -> None:
	telegram_bot: TelegramBot = TelegramBot.objects.get(id=telegram_bot_id)
	telegram_bot.is_running = True
	telegram_bot.is_stopped = False
	telegram_bot.save()

	user_telegram_bot = UserTelegramBot(telegram_bot=telegram_bot)
	Thread(target=start_telegram_bot_, args=(user_telegram_bot,), daemon=True).start()

@shared_task
def start_all_telegram_bots() -> None:
	constructor_telegram_bot = ConstructorTelegramBot()
	Thread(target=start_telegram_bot_, args=(constructor_telegram_bot,), daemon=True).start()

	for telegram_bot in TelegramBot.objects.all():
		if telegram_bot.is_running:
			if platform == 'win32':
				start_telegram_bot(telegram_bot_id=telegram_bot.id)
			else:
				start_telegram_bot.delay(telegram_bot_id=telegram_bot.id)