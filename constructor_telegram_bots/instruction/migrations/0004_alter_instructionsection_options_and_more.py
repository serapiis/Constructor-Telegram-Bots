# Generated by Django 4.2.3 on 2023-09-03 21:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instruction', '0003_alter_instructionsection_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='instructionsection',
            options={'ordering': ['position'], 'verbose_name': 'Раздел', 'verbose_name_plural': 'Разделы'},
        ),
        migrations.RemoveField(
            model_name='instructionsection',
            name='last_update',
        ),
    ]
