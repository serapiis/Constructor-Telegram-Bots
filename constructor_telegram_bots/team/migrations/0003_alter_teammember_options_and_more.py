# Generated by Django 4.2.3 on 2023-09-03 21:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0002_rename_teammembers_teammember_alter_teammember_table'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='teammember',
            options={'verbose_name': 'Члена', 'verbose_name_plural': 'Члены'},
        ),
        migrations.RenameField(
            model_name='teammember',
            old_name='date_joined',
            new_name='joined_date',
        ),
    ]