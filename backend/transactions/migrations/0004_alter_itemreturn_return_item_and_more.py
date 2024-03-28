# Generated by Django 4.2.9 on 2024-03-28 12:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0003_alter_unreturntoreturn_unreturn_item_to_return'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemreturn',
            name='return_item',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='item_return', to='transactions.itemborrow'),
        ),
        migrations.AlterField(
            model_name='unreturntoreturn',
            name='unreturn_item_to_return',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='item_return', to='transactions.itemunreturn'),
        ),
    ]
