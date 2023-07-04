{
	const telegramBotCommandVariablesButtons = {
		userId:  document.querySelector('#telegramBotCommandUserIdVariableButton'),
		userUsername:  document.querySelector('#telegramBotCommandUserUsernameVariableButton'),
		userFirstName: document.querySelector('#telegramBotCommandUserFirstNameVariableButton'),
		userLastName: document.querySelector('#telegramBotCommandUserLastNameVariableButton'),
		userMessageId:  document.querySelector('#telegramBotCommandUserMessageIdVariableButton'),
		userMessageText: document.querySelector('#telegramBotCommandUserMessageTextVariableButton'),
		condition: document.querySelector('#telegramBotCommandConditionVariableButton'),
		loop: document.querySelector('#telegramBotCommandLoopVariableButton'),
		apiResponse: document.querySelector('#telegramBotCommandApiResponseVariableButton'),
	};

	var telegramBotCommand = {
		cardHeader: document.querySelector('#telegramBotCommandCardHeader'),

		nameInput: document.querySelector('#telegramBotCommandNameInput'),
		textInput: document.querySelector('#telegramBotCommandTextInput'),

		additions: {
			command: {
				button: document.querySelector('#telegramBotCommandAddCommandAdditionButton'),
				div: document.querySelector('#telegramBotCommandCommandAddition'),

				variablesButtons: [],

				input: document.querySelector('#telegramBotCommandCommandInput'),
			},
			image: {
				button: document.querySelector('#telegramBotCommandAddImageAdditionButton'),
				div: document.querySelector('#telegramBotCommandImageAddition'),

				variablesButtons: [],

				preview: document.querySelector('#telegramBotCommandImagePreview'),
				input: document.querySelector('#telegramBotCommandImageInput'),
				file: null,
			},
			keyboard: {
				button: document.querySelector('#telegramBotCommandAddKeyboardAdditionButton'),
				div: document.querySelector('#telegramBotCommandKeyboardAddition'),

				variablesButtons: [],

				defaultRadio: document.querySelector('#telegramBotCommandDefaultKeyboardRadio'),
				inlineRadio: document.querySelector('#telegramBotCommandInlineKeyboardRadio'),

				rows: document.querySelector('#telegramBotCommandKeyboardRows'),
				selectedRow: null,

				buttons: document.querySelector('#telegramBotCommandKeyboardButtons'),
				addKeyboardButton: document.querySelector('#telegramBotCommandAddKeyboardButton'),
			},
			apiRequest: {
				button: document.querySelector('#telegramBotCommandAddApiRequestAdditionButton'),
				div: document.querySelector('#telegramBotCommandApiRequestAddition'),

				variablesButtons: [telegramBotCommandVariablesButtons.apiResponse],

				urlInput: document.querySelector('#telegramBotCommandApiRequestUrlInput'),
				dataInput: document.querySelector('#telegramBotCommandApiRequestDataInput'),
			},
		},

		backToAddButton: document.querySelector('.back-add-telegram-bot-command-button'),
		addOrEditButton: document.querySelector('.add-or-edit-telegram-bot-command-button'),
	};

	const telegramBotCommandVariables = {
		userId: {
			button: telegramBotCommandVariablesButtons.userId,
			allowedInputs: [],
			value: '{{ user_id }}',
		},
		userUsername: {
			button: telegramBotCommandVariablesButtons.userUsername,
			allowedInputs: [],
			value: '{{ user_username }}',
		},
		userFirstName: {
			button: telegramBotCommandVariablesButtons.userFirstName,
			allowedInputs: [],
			value: '{{ user_first_name }}',
		},
		userLastName: {
			button: telegramBotCommandVariablesButtons.userLastName,
			allowedInputs: [],
			value: '{{ user_last_name }}',
		},
		userMessageId: {
			button: telegramBotCommandVariablesButtons.userMessageId,
			allowedInputs: [],
			value: '{{ user_message_id }}',
		},
		userMessageText: {
			button: telegramBotCommandVariablesButtons.userMessageText,
			allowedInputs: [],
			value: '{{ user_message_text }}',
		},
		condition: {
			button: telegramBotCommandVariablesButtons.condition,
			allowedInputs: [telegramBotCommand.textInput],
			value: '{% if value == value %}\nText\n{% else %}\nOther text\n{% endif %}',
		},
		loop: {
			button: telegramBotCommandVariablesButtons.loop,
			allowedInputs: [telegramBotCommand.textInput],
			value: '{% for value in values %}\n{{ value }}\n{% endfor %}',
		},
		apiResponse: {
			button: telegramBotCommandVariablesButtons.apiResponse,
			allowedInputs: [telegramBotCommand.textInput],
			value: '{{ api_response.key or api_response[0] }}',
		},

		allowedInputs: [
			telegramBotCommand.textInput,
			telegramBotCommand.additions.command.input,
			telegramBotCommand.additions.apiRequest.urlInput,
			telegramBotCommand.additions.apiRequest.dataInput,
		],

		selected: null,
	};

	function checkTelegramBotCommandVariable(variable) {
		return (variable != 'allowedInputs' &&  variable != 'selected');
	}

	function searchAllowedInputInTelegramBotCommandVariable(allowedInput) {
		if (telegramBotCommandVariables.selected != null) {
			for (const variable in telegramBotCommandVariables) {
				if (checkTelegramBotCommandVariable(variable)) {
					if (
						telegramBotCommandVariables[variable].value == telegramBotCommandVariables.selected && 
						(
							telegramBotCommandVariables[variable].allowedInputs.length == 0 ||
							telegramBotCommandVariables[variable].allowedInputs.indexOf(allowedInput) != -1
						)
					) {
						return true;
					}
				}
			}
		}
		return false;
	}

	function telegramBotCommandVariablesAllClear() {
		for (const variable in telegramBotCommandVariables) {
			if (checkTelegramBotCommandVariable(variable)) {
				telegramBotCommandVariables[variable].button.classList.replace('btn-secondary', 'btn-dark');
			}
		}
	}

	telegramBotCommandVariables.allowedInputs.forEach(allowedInput => {
		allowedInput.addEventListener('mouseover', function() {
			allowedInput.style.cursor = (searchAllowedInputInTelegramBotCommandVariable(allowedInput)) ? 'copy' : 'auto';
		});

		allowedInput.addEventListener('click', function() {
			if (searchAllowedInputInTelegramBotCommandVariable(allowedInput)) {
				allowedInput.style.cursor = 'auto';
				allowedInput.value = `${allowedInput.value}${telegramBotCommandVariables.selected}`;

				telegramBotCommandVariablesAllClear();

				telegramBotCommandVariables.selected = null;
			}
		})
	});

	for (const variable in telegramBotCommandVariables) {
		if (checkTelegramBotCommandVariable(variable) == true) {
			telegramBotCommandVariables[variable].button.addEventListener('click', function() {
				telegramBotCommandVariablesAllClear();

				if (telegramBotCommandVariables.selected != telegramBotCommandVariables[variable].value) {
					telegramBotCommandVariables[variable].button.classList.replace('btn-dark', 'btn-secondary');

					telegramBotCommandVariables.selected = telegramBotCommandVariables[variable].value;
				} else {
					telegramBotCommandVariables[variable].button.classList.replace('btn-secondary', 'btn-dark');

					telegramBotCommandVariables.selected = null;
				}
			});
		}
	}

	telegramBotCommand.additions.image.input.addEventListener('change', function(event) {
		telegramBotCommand.additions.image.file = event.target.files[0];

		const telegramBotCommandImageReader = new FileReader();
		telegramBotCommandImageReader.addEventListener('load', function() {
			telegramBotCommand.additions.image.preview.classList.remove('d-none');
			telegramBotCommand.additions.image.preview.src = telegramBotCommandImageReader.result;
		});
		telegramBotCommandImageReader.readAsDataURL(telegramBotCommand.additions.image.file);
	});

	function telegramBotCommandAddKeyboardButtonRowButton(row) {
		const telegramBotCommandKeyboardButtonRowButton = document.createElement('button');
		telegramBotCommandKeyboardButtonRowButton.classList = 'btn btn-sm btn-secondary telegram-bot-command-keyboard-button-row-button';
		telegramBotCommandKeyboardButtonRowButton.id = row;
		telegramBotCommandKeyboardButtonRowButton.type = 'button';
		telegramBotCommandKeyboardButtonRowButton.innerHTML = row;
		telegramBotCommandKeyboardButtonRowButton.addEventListener('click', function() {
			telegramBotCommandKeyboardButtonRowButton.remove();
		});

		return telegramBotCommandKeyboardButtonRowButton;
	}

	function telegramBotCommandAddKeyboardButtonLinkInput(
		telegramBotCommandKeyboardButton,
		telegramBotCommandKeyboardButtonAddLinkButton,
		telegramBotCommandKeyboardButtonUrl
	) {
		const telegramBotCommandKeyboardButtonLinkInput = document.createElement('input');
		telegramBotCommandKeyboardButtonLinkInput.classList = 'form-control form-control-sm telegram-bot-command-keyboard-button-link-input';
		telegramBotCommandKeyboardButtonLinkInput.type = 'text';
		telegramBotCommandKeyboardButtonLinkInput.placeholder = telegramBotCommandKeyboardButtonUrlText;
		telegramBotCommandKeyboardButtonLinkInput.value = telegramBotCommandKeyboardButtonUrl;

		if (telegramBotCommandKeyboardButtonAddLinkButton == null) {
			telegramBotCommandKeyboardButton.insertBefore(
				telegramBotCommandKeyboardButtonLinkInput,
				telegramBotCommandKeyboardButton.querySelector('.delete-button')
			);
		} else {
			telegramBotCommandKeyboardButton.replaceChild(
				telegramBotCommandKeyboardButtonLinkInput,
				telegramBotCommandKeyboardButtonAddLinkButton
			);
		} 

		telegramBotCommandKeyboardButtonLinkInput.focus();	
	}

	function telegramBotCommandAddKeyboardButtonAddLinkButton(telegramBotCommandKeyboardButton) {
		const telegramBotCommandKeyboardButtonAddLinkButton = document.createElement('button');
		telegramBotCommandKeyboardButtonAddLinkButton.classList = 'btn btn-sm btn-primary telegram-bot-command-keyboard-button-add-link-button';
		telegramBotCommandKeyboardButtonAddLinkButton.type = 'button';
		telegramBotCommandKeyboardButtonAddLinkButton.innerHTML = '<i class="bi bi-link-45deg" style="-webkit-text-stroke: 0.25px;"></i>';
		telegramBotCommandKeyboardButtonAddLinkButton.addEventListener('click', function() {
			telegramBotCommandAddKeyboardButtonLinkInput(
				telegramBotCommandKeyboardButton,
				telegramBotCommandKeyboardButtonAddLinkButton,
				null
			);
		});

		telegramBotCommandKeyboardButton.insertBefore(
			telegramBotCommandKeyboardButtonAddLinkButton,
			telegramBotCommandKeyboardButton.querySelector('.delete-button')
		);
	}

	function telegramBotCommandAddKeyboardButton(
		telegramBotCommandKeyboardButtonId,
		telegramBotCommandKeyboardButtonRow,
		telegramBotCommandKeyboardButtonText,
		telegramBotCommandKeyboardButtonUrl
	) {
		const telegramBotCommandKeyboardRowsNum = telegramBotCommand.additions.keyboard.rows.querySelectorAll('#telegramBotCommandKeyboardRow').length;

		const telegramBotCommandKeyboardRow = document.createElement('div');
		telegramBotCommandKeyboardRow.classList = 'col-auto';
		telegramBotCommandKeyboardRow.innerHTML = `<button class="btn btn-sm btn-dark" id="telegramBotCommandKeyboardRow" type="button">${telegramBotCommandKeyboardRowsNum + 1}</button>`;
		telegramBotCommandKeyboardRow.addEventListener('click', function() {
			telegramBotCommand.additions.keyboard.rows.querySelectorAll('#telegramBotCommandKeyboardRow').forEach(
				telegramBotCommandKeyboardRow => telegramBotCommandKeyboardRow.classList.replace('btn-secondary', 'btn-dark')
			);

			const selectedTelegramBotCommandKeyboardRow = telegramBotCommandKeyboardRow.querySelector('#telegramBotCommandKeyboardRow');

			if (selectedTelegramBotCommandKeyboardRow == telegramBotCommand.additions.keyboard.selectedRow) {
				telegramBotCommand.additions.keyboard.selectedRow = null;
			} else {
				selectedTelegramBotCommandKeyboardRow.classList.replace('btn-dark', 'btn-secondary');
				telegramBotCommand.additions.keyboard.selectedRow = selectedTelegramBotCommandKeyboardRow;
			}
		});

		telegramBotCommand.additions.keyboard.rows.append(telegramBotCommandKeyboardRow);

		const telegramBotCommandKeyboardButton = document.createElement('div');
		telegramBotCommandKeyboardButton.classList = 'input-group keyboard-button mb-1';
		telegramBotCommandKeyboardButton.id = telegramBotCommandKeyboardButtonId;

		const telegramBotCommandKeyboardButtonMoveUpButton = document.createElement('button');
		telegramBotCommandKeyboardButtonMoveUpButton.classList = 'btn btn-sm btn-dark';
		telegramBotCommandKeyboardButtonMoveUpButton.type = 'button';
		telegramBotCommandKeyboardButtonMoveUpButton.innerHTML = '<i class="bi bi-arrow-up" style="-webkit-text-stroke: 1px;"></i>';
		telegramBotCommandKeyboardButtonMoveUpButton.addEventListener('click', function() {
			const previousTelegramBotCommandKeyboardButton = telegramBotCommandKeyboardButton.previousElementSibling;

			if (previousTelegramBotCommandKeyboardButton != null) {
				telegramBotCommandKeyboardButton.parentNode.insertBefore(
					telegramBotCommandKeyboardButton,
					previousTelegramBotCommandKeyboardButton
				);
			}
		});

		telegramBotCommandKeyboardButton.append(telegramBotCommandKeyboardButtonMoveUpButton);

		const telegramBotCommandKeyboardButtonMoveDownButton = document.createElement('button');
		telegramBotCommandKeyboardButtonMoveDownButton.classList = 'btn btn-sm btn-dark';
		telegramBotCommandKeyboardButtonMoveDownButton.type = 'button';
		telegramBotCommandKeyboardButtonMoveDownButton.innerHTML = '<i class="bi bi-arrow-down" style="-webkit-text-stroke: 1px;"></i>';
		telegramBotCommandKeyboardButtonMoveDownButton.addEventListener('click', function() {
			const nextTelegramBotCommandKeyboardButton = telegramBotCommandKeyboardButton.nextElementSibling;

			if (nextTelegramBotCommandKeyboardButton != null) {
				telegramBotCommandKeyboardButton.parentNode.insertBefore(
					nextTelegramBotCommandKeyboardButton,
					telegramBotCommandKeyboardButton
				);
			}
		});

		telegramBotCommandKeyboardButton.append(telegramBotCommandKeyboardButtonMoveDownButton);

		if (telegramBotCommandKeyboardButtonRow != null) {
			telegramBotCommandKeyboardButton.append(
				telegramBotCommandAddKeyboardButtonRowButton(telegramBotCommandKeyboardButtonRow)
			);
		}

		const telegramBotCommandKeyboardButtonNameInput = document.createElement('input');
		telegramBotCommandKeyboardButtonNameInput.classList = 'form-control form-control-sm telegram-bot-command-keyboard-button-name-input';
		telegramBotCommandKeyboardButtonNameInput.type = 'text';
		telegramBotCommandKeyboardButtonNameInput.placeholder = telegramBotCommandKeyboardButtonNameText;
		telegramBotCommandKeyboardButtonNameInput.value = telegramBotCommandKeyboardButtonText;
		telegramBotCommandKeyboardButtonNameInput.addEventListener('mouseover', function() {
			telegramBotCommandKeyboardButtonNameInput.style.cursor = (telegramBotCommand.additions.keyboard.selectedRow != null) ? 'copy' : 'auto';
		});
		telegramBotCommandKeyboardButtonNameInput.addEventListener('click', function() {
			if (telegramBotCommand.additions.keyboard.selectedRow != null) {
				let telegramBotCommandKeyboardButtonRowButton = telegramBotCommandKeyboardButton.querySelector('.telegram-bot-command-keyboard-button-row-button');

				if (telegramBotCommandKeyboardButtonRowButton != null) {
					telegramBotCommandKeyboardButtonRowButton.remove();
				}

				telegramBotCommandKeyboardButtonRowButton = telegramBotCommandAddKeyboardButtonRowButton(
					telegramBotCommand.additions.keyboard.selectedRow.innerHTML
				)

				telegramBotCommandKeyboardButton.insertBefore(
					telegramBotCommandKeyboardButtonRowButton,
					telegramBotCommandKeyboardButtonNameInput
				);

				telegramBotCommand.additions.keyboard.selectedRow.classList.replace('btn-secondary', 'btn-dark');
				telegramBotCommand.additions.keyboard.selectedRow = null;
			}
		});

		telegramBotCommandKeyboardButton.append(telegramBotCommandKeyboardButtonNameInput);

		if (telegramBotCommand.additions.keyboard.inlineRadio.checked) {
			if (telegramBotCommandKeyboardButtonUrl == null) {
				telegramBotCommandAddKeyboardButtonAddLinkButton(telegramBotCommandKeyboardButton);
			} else {
				telegramBotCommandAddKeyboardButtonLinkInput(
					telegramBotCommandKeyboardButton,
					null,
					telegramBotCommandKeyboardButtonUrl
				);
			}
		}

		const telegramBotCommandKeyboardButtonDelete = document.createElement('button');
		telegramBotCommandKeyboardButtonDelete.classList = 'btn btn-sm btn-danger delete-button';
		telegramBotCommandKeyboardButtonDelete.type = 'button';
		telegramBotCommandKeyboardButtonDelete.innerHTML = '<i class="bi bi-x-lg" style="-webkit-text-stroke: 1.25px;"></i>';
		telegramBotCommandKeyboardButtonDelete.addEventListener('click', function() {
			const telegramBotCommandKeyboardRows = telegramBotCommand.additions.keyboard.rows.querySelectorAll('#telegramBotCommandKeyboardRow');
			const telegramBotCommandKeyboardRow = telegramBotCommandKeyboardRows[telegramBotCommandKeyboardRows.length - 1];

			telegramBotCommand.additions.keyboard.buttons.querySelectorAll(`.telegram-bot-command-keyboard-button-row-button[id="${telegramBotCommandKeyboardRow.innerHTML}"]`).forEach(
				telegramBotCommandKeyboardButtonRowButton => telegramBotCommandKeyboardButtonRowButton.remove()
			)

			telegramBotCommandKeyboardRow.parentElement.remove();
			telegramBotCommandKeyboardButton.remove();
		});

		telegramBotCommandKeyboardButton.append(telegramBotCommandKeyboardButtonDelete);

		telegramBotCommand.additions.keyboard.buttons.append(telegramBotCommandKeyboardButton);

		telegramBotCommandKeyboardButtonNameInput.focus();
	}

	telegramBotCommand.additions.keyboard.defaultRadio.addEventListener('click', function() {
		telegramBotCommand.additions.keyboard.buttons.querySelectorAll('.telegram-bot-command-keyboard-button-add-link-button').forEach(
			telegramBotCommandKeyboardButtonAddLinkButton => telegramBotCommandKeyboardButtonAddLinkButton.remove()
		);
		telegramBotCommand.additions.keyboard.buttons.querySelectorAll('.telegram-bot-command-keyboard-button-link-input').forEach(
			telegramBotCommandKeyboardButtonLinkInput => telegramBotCommandKeyboardButtonLinkInput.remove()
		);
	});

	telegramBotCommand.additions.keyboard.inlineRadio.addEventListener('click', function() {
		telegramBotCommand.additions.keyboard.buttons.querySelectorAll('.keyboard-button').forEach(
			telegramBotCommandKeyboardButton => {
				if (
					telegramBotCommandKeyboardButton.querySelector('.telegram-bot-command-keyboard-button-add-link-button') == null && 
					telegramBotCommandKeyboardButton.querySelector('.telegram-bot-command-keyboard-button-link-input') == null
				) {
					telegramBotCommandAddKeyboardButtonAddLinkButton(telegramBotCommandKeyboardButton);
				}
			}
		);
	});

	telegramBotCommand.additions.keyboard.addKeyboardButton.addEventListener('click', function() {
		telegramBotCommandAddKeyboardButton('', null, null, null);
	});

	for (const addition in telegramBotCommand.additions) {
		telegramBotCommand.additions[addition].button.addEventListener('click', function() {
			if (telegramBotCommand.additions[addition].div.classList.toggle('d-none')) {
				telegramBotCommand.additions[addition].button.classList.replace('btn-secondary', 'btn-dark');
			} else {
				telegramBotCommand.additions[addition].button.classList.replace('btn-dark', 'btn-secondary');
			}

			telegramBotCommand.additions[addition].variablesButtons.forEach(variableButton => {
				variableButton.classList.toggle('d-none');
			});
		});
	}

	function telegramBotCommandClearAll() {
		telegramBotCommand.cardHeader.innerHTML = telegramBotCommandCardHeaderAddCommandTitleText;

		telegramBotCommandVariablesAllClear();
		telegramBotCommandVariables.selected = null;

		telegramBotCommand.nameInput.value = '';
		telegramBotCommand.textInput.value = '';

		telegramBotCommand.additions.command.input.value = '';

		telegramBotCommand.additions.image.preview.classList.add('d-none');
		telegramBotCommand.additions.image.preview.src = '';
		telegramBotCommand.additions.image.input.value = null;
		telegramBotCommand.additions.image.file = null;

		telegramBotCommand.additions.keyboard.defaultRadio.checked = true;

		telegramBotCommand.additions.keyboard.rows.innerHTML = '';
		telegramBotCommand.additions.keyboard.selectedRow = null;

		telegramBotCommand.additions.keyboard.buttons.innerHTML = '';

		telegramBotCommand.additions.apiRequest.variablesButtons[0].classList.add('d-none');

		telegramBotCommand.additions.apiRequest.urlInput.value = '';
		telegramBotCommand.additions.apiRequest.dataInput.value = '';

		for (const addition in telegramBotCommand.additions) {
			telegramBotCommand.additions[addition].button.classList.replace('btn-secondary', 'btn-dark');
			telegramBotCommand.additions[addition].div.classList.add('d-none');
		}

		telegramBotCommand.backToAddButton.classList.add('d-none');

		telegramBotCommand.addOrEditButton.id = '0';
		telegramBotCommand.addOrEditButton.innerHTML = telegramBotCommandFooterAddCommandButtonText;
	}

	telegramBotCommand.backToAddButton.addEventListener('click', telegramBotCommandClearAll);

	function editTelegramBotCommand(telegramBotCommand_) {
		telegramBotCommandClearAll();

		telegramBotCommand.cardHeader.innerHTML = telegramBotCommandCardHeaderEditCommandTitleText;

		telegramBotCommand.nameInput.value = telegramBotCommand_['name'];
		telegramBotCommand.textInput.value = telegramBotCommand_['message_text'];

		if (telegramBotCommand_['command'] != null) {
			telegramBotCommand.additions.command.button.classList.replace('btn-dark', 'btn-secondary');
			telegramBotCommand.additions.command.div.classList.remove('d-none');

			telegramBotCommand.additions.command.input.value = telegramBotCommand_['command'];
		}

		if (telegramBotCommand_['image'] != '') {
			telegramBotCommand.additions.image.button.classList.replace('btn-dark', 'btn-secondary');
			telegramBotCommand.additions.image.div.classList.remove('d-none');

			telegramBotCommand.additions.image.preview.classList.remove('d-none');
			telegramBotCommand.additions.image.preview.src = `/${telegramBotCommand_['image']}`;
		}

		if (telegramBotCommand_['keyboard'] != null) {
			telegramBotCommand.additions.keyboard.button.classList.replace('btn-dark', 'btn-secondary');
			telegramBotCommand.additions.keyboard.div.classList.remove('d-none');

			if (telegramBotCommand_['keyboard']['type'] == 'default') {
				telegramBotCommand.additions.keyboard.defaultRadio.checked = true;
			} else {
				telegramBotCommand.additions.keyboard.inlineRadio.checked = true;
			}

			telegramBotCommand_['keyboard']['buttons'].forEach(telegramBotCommandKeyboardButton => telegramBotCommandAddKeyboardButton(
				telegramBotCommandKeyboardButton['id'],
				telegramBotCommandKeyboardButton['row'],
				telegramBotCommandKeyboardButton['text'],
				telegramBotCommandKeyboardButton['url']
			));
		}

		if (telegramBotCommand_['api_request'] != null) {
			telegramBotCommand.additions.apiRequest.variablesButtons[0].classList.remove('d-none');

			telegramBotCommand.additions.apiRequest.button.classList.replace('btn-dark', 'btn-secondary');
			telegramBotCommand.additions.apiRequest.div.classList.remove('d-none');

			telegramBotCommand.additions.apiRequest.urlInput.value = telegramBotCommand_['api_request']['url'];
			telegramBotCommand.additions.apiRequest.dataInput.value = telegramBotCommand_['api_request']['data'];
		}

		telegramBotCommand.backToAddButton.classList.remove('d-none');

		telegramBotCommand.addOrEditButton.id = telegramBotCommand_['id'];
		telegramBotCommand.addOrEditButton.innerHTML = telegramBotCommandFooterSaveCommandButtonText;
	}

	telegramBotCommand.addOrEditButton.addEventListener('click', function() {
		const telegramBotCommandData_ = {
			'name': telegramBotCommand.nameInput.value,
			'command': null,
			'message_text': telegramBotCommand.textInput.value,
			'keyboard': null,
			'api_request': null,
		}

		if (telegramBotCommand.additions.command.div.classList.contains('d-none') == false) {
			telegramBotCommandData_['command'] = telegramBotCommand.additions.command.input.value;
		}

		const telegramBotCommandData = new FormData();

		if (
			telegramBotCommand.additions.image.div.classList.contains('d-none') == false &&
			telegramBotCommand.additions.image.preview.classList.contains('d-none') == false
		) {
			if (telegramBotCommand.additions.image.file != null) {
				telegramBotCommandData.append('image', telegramBotCommand.additions.image.file);
			} else {
				telegramBotCommandData.append('image', 'not_edited');
			}
		} else {
			telegramBotCommandData.append('image', 'null');
		}

		if (telegramBotCommand.additions.keyboard.div.classList.contains('d-none') == false) {
			const telegramBotCommandKeyboardButtons_ = [];

			telegramBotCommand.additions.keyboard.buttons.querySelectorAll('.keyboard-button').forEach(telegramBotCommandKeyboardButton => {
				const telegramBotCommandKeyboardButtonRowButton = telegramBotCommandKeyboardButton.querySelector('.telegram-bot-command-keyboard-button-row-button');
				const telegramBotCommandKeyboardButtonNameInput = telegramBotCommandKeyboardButton.querySelector('.telegram-bot-command-keyboard-button-name-input');
				const telegramBotCommandKeyboardButtonLinkInput = telegramBotCommandKeyboardButton.querySelector('.telegram-bot-command-keyboard-button-link-input');

				telegramBotCommandKeyboardButtons_.push(
					{
						'id': telegramBotCommandKeyboardButton.id,
						'row': (telegramBotCommandKeyboardButtonRowButton == null) ? null : parseInt(telegramBotCommandKeyboardButtonRowButton.id),
						'text': (telegramBotCommandKeyboardButtonNameInput == null) ? null : telegramBotCommandKeyboardButtonNameInput.value,
						'url': (telegramBotCommandKeyboardButtonLinkInput == null) ? null : telegramBotCommandKeyboardButtonLinkInput.value,
					}
				);
			});

			telegramBotCommandData_['keyboard'] = {
				'type': (telegramBotCommand.additions.keyboard.defaultRadio.checked) ? 'default' : 'inline',
				'buttons': telegramBotCommandKeyboardButtons_,
			}
		}

		if (telegramBotCommand.additions.apiRequest.div.classList.contains('d-none') == false) {
			telegramBotCommandData_['api_request'] = {
				'url': telegramBotCommand.additions.apiRequest.urlInput.value,
				'data': telegramBotCommand.additions.apiRequest.dataInput.value,
			}
		}

		telegramBotCommandData.append('data', JSON.stringify(telegramBotCommandData_));

		fetch(
			(telegramBotCommand.addOrEditButton.id == '0') ? addTelegramBotCommandUrl : `/telegram-bot/${telegramBotId}/command/${telegramBotCommand.addOrEditButton.id}/edit/`,
			{
				method: 'POST',
				body: telegramBotCommandData,
			}
		).then(response => {
			if (response.ok) {
				updateTelegramBotCommands();
				telegramBotCommandClearAll();
			}

			response.json().then(jsonResponse => createAlert(mainAlertContainer, jsonResponse['message'], jsonResponse['level']));
		});
	});
}