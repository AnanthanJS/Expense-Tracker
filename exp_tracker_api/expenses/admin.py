from django.contrib import admin
from .models import Expense, Profile

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'amount', 'category', 'date', 'created_at')  # Customize fields displayed in the admin list view
    search_fields = ('user__username', 'title', 'category')  # Add search functionality
    list_filter = ('user', 'category', 'date')  # Add filters for category and date

    def get_queryset(self, request):
        """Limit the displayed expenses to only those created by the current user."""
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs  # Superuser sees all expenses
        return qs.filter(user=request.user)  # Regular users see only their expenses

    def save_model(self, request, obj, form, change):
        """Set the user to the currently logged-in user when saving the model."""
        if not change:  # Only set the user on object creation
            obj.user = request.user
        obj.save()

# Register the models
admin.site.register(Expense, ExpenseAdmin)
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