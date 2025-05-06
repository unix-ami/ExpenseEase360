from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'first_name', 'last_name', 'role', 'region', 'country', 'branch', 'department', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff', 'role', 'region', 'country', 'branch', 'department')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

    # Remove date_joined field from fieldsets
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'role', 'region', 'country', 'branch', 'department')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'role', 'region', 'country', 'branch', 'department', 'is_active', 'is_staff')
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)


