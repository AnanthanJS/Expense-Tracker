from django.contrib import admin
from .models import Expense, Profile

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'contact_number', 'place', 'company', 'salary', 'job_title')
    search_fields = ('user__username', 'bio', 'company', 'contact_number')
    list_filter = ('job_title', 'company', 'place')
    
    # Customize how fields are displayed in the form view
    fieldsets = (
        (None, {
            'fields': ('user', 'bio', 'profile_picture')
        }),
        ('Contact Information', {
            'fields': ('contact_number', 'place', 'company'),
        }),
        ('Job Information', {
            'fields': ('salary', 'job_title'),
        }),
    )

admin.site.register(Profile, ProfileAdmin)

admin.site.register(Expense)