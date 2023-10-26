# Generated by Django 4.2.5 on 2023-10-26 00:48

from django.db import migrations, models
import instruction.models


class Migration(migrations.Migration):

    dependencies = [
        ('instruction', '0004_alter_instructionsection_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instructionsection',
            name='position',
            field=models.IntegerField(blank=True, default=instruction.models.InstructionSection.position_default, verbose_name='Позиция'),
        ),
    ]
