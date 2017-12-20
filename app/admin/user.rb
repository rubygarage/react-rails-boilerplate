ActiveAdmin.register Admin::User, as: "User" do
  permit_params :username, :email, avatar_attributes: [:id, :image, :_destroy]

  index do
    selectable_column

    id_column
    column :username
    column :email
    column :confirmed_at
    column :created_at
    column :updated_at

    actions do |resource|
      item 'Confirm Email', confirm_email_admin_user_path(resource), method: :post unless resource.confirmed_at
      item 'Unconfirm Email', unconfirm_email_admin_user_path(resource), method: :post if resource.confirmed_at
    end
  end

  form :html => { :multipart => true } do |f|
    f.inputs t('active_admin.details', model: 'User') do
      f.input :username
      f.input :email
    end

    f.has_many :avatar, class: 'has_one', allow_destroy: true do |avatar|
      avatar.input :image, as: :file, :hint => f.object.avatar.present? \
        ? image_tag(f.object.avatar.image_url(:thumb))
        : content_tag(:span, "no avatar yet")
    end

    actions do
      f.action :submit
    end
  end

  member_action :confirm_email, method: :post do
    Admin::User::ConfirmEmail.(permitted_params, user: resource)
    redirect_to resource_path(resource), notice: 'Email confirmed'
  end

  member_action :unconfirm_email, method: :post do
    Admin::User::UnconfirmEmail.(permitted_params, user: resource)
    redirect_to resource_path(resource), notice: 'Email unconfirmed'
  end

  action_item :confirm_email, only: %i[show edit], if: proc { !resource.confirmed_at? } do
    link_to 'Confirm Email', confirm_email_admin_user_path(resource), method: :post
  end

  action_item :unconfirm_email, only: %i[show edit], if: proc { resource.confirmed_at? } do
    link_to 'Unconfirm Email', unconfirm_email_admin_user_path(resource), method: :post
  end
end
