ActiveAdmin.register Admin::Models::User do
  menu label: "Users"
  permit_params :username, :email, avatar_attributes: %i[id image_destroy]

  index do
    selectable_column

    id_column
    column :username
    column :email
    column :confirmed_at
    column :created_at
    column :updated_at

    actions do |resource|
      if resource.confirmed_at
        item I18n.t('active_admin.user.unconfirm_email'), unconfirm_email_admin_admin_models_user_path(resource), method: :post
      else
        item I18n.t('active_admin.user.confirm_email'), confirm_email_admin_admin_models_user_path(resource), method: :post
      end
    end
  end

  form html: { multipart: true } do |f|
    f.inputs t('active_admin.details', model: 'Admin::Models::User') do
      f.input :username
      f.input :email
    end

    hint = if f.object.avatar.present?
             image_tag(f.object.avatar.image_url(:thumb))
           else
             content_tag(:span, I18n.t('active_admin.user.without_avatar'))
           end

    f.has_many :avatar, class: 'has_one', allow_destroy: true do |avatar|
      avatar.input :image, as: :file, hint: hint
    end

    actions do
      f.action :submit
    end
  end

  member_action :confirm_email, method: :post do
    Admin::Concepts::User::Operation::ConfirmEmail.call(permitted_params, user: resource)
    redirect_to resource_path(resource), notice: I18n.t('active_admin.user.notices.email_confirmed')
  end

  member_action :unconfirm_email, method: :post do
    Admin::Concepts::User::Operation::UnconfirmEmail.call(permitted_params, user: resource)
    redirect_to resource_path(resource), notice: I18n.t('active_admin.user.notices.email_unconfirmed')
  end

  action_item :confirm_email, only: %i[show edit], if: proc { !resource.confirmed_at? } do
    link_to I18n.t('active_admin.user.confirm_email'), confirm_email_admin_admin_models_user_path(resource), method: :post
  end

  action_item :unconfirm_email, only: %i[show edit], if: proc { resource.confirmed_at? } do
    link_to I18n.t('active_admin.user.unconfirm_email'), unconfirm_email_admin_admin_models_user_path(resource), method: :post
  end

  show do
    panel I18n.t('active_admin.user.user_details') do
      attributes_table_for resource do
        row :username
        row :email
        row :confirmed_at
        row :created_at
        row :updated_at
        row :avatar do |img|
          if img.avatar.present?
            image_tag(img.avatar.image_url(:thumb), size: '80x60')
          else
            content_tag(:span, I18n.t('active_admin.user.without_avatar'))
          end
        end
      end
    end
  end
end
