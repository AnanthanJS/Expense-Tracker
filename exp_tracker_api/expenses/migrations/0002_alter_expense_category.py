# Generated by Django 5.0.6 on 2025-01-08 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='category',
            field=models.CharField(choices=[('Food', 'Food'), ('Transport', 'Transport'), ('Health', 'Health'), ('Fuel', 'Fuel'), ('Entertainment', 'Entertainment'), ('Utilities', 'Utilities'), ('Other', 'Other')], max_length=50),
        ),
    ]
