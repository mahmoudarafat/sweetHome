var token = $('#csrf-token').val();


/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- CATEGORIES SECTION  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */
$(document).on('click', '.add-main-modal', function () {
    $('#footer_action_button').text(" New Cat");
    $('#footer_action_button').addClass('fa fa-plus');
    $('#footer_action_button').removeClass('fa fa-trash');
    $('#footer_action_button').removeClass('fa fa-pencil');
    $('.actionBtn').addClass('btn-primary');
    $('.actionBtn').removeClass('btn-danger');
    $('.actionBtn').removeClass('btn-success');
    $('.actionBtn').addClass('add');
    $('.modal-title').text('New Cat');
    $('.deleteContent').hide();
    $('.form-edit').hide();
    $('.form-add').show();
    $('#Main-Cat').modal('show');
});

$('.modal-footer').on('click', '.add', function () {

    $.ajax({
        url: '/admin/addMainCat',
        type: 'post',
        data: {
            '_token': $('input[name=_token]').val(),
            'name': $('input[id=cat_name]').val(),
            'countMain': $('#countMain').text()
        },
        success: function (data) {
            $('#mainCategories').append(
                "<tr class='main-item" + data.id + "'>" +
                "<td><a href='" + data.url + "'>" + data.name + "</a></td>" +
                "<td>" + data.item_count + "</td>" +
                "<td><button class='edit-main-modal btn btn-info' data-id='" + data.id + "' data-name='" + data.name + "' >" +
                "<span class='fa fa-pencil'></span> Edit</button> " +
                "<button class='delete-main-modal btn btn-danger' data-id='" + data.id + "'>" +
                "<span class='fa fa-trash'></span> Delete</button>" +
                "</td>" +
                "</tr>");
        }

    });
    $('#cat_name').val('');
});

$(document).on('click', '.delete-main-modal', function () {
    $('#footer_action_button').text(" Delete");
    $('#footer_action_button').removeClass('fa fa-pencil');
    $('#footer_action_button').addClass('fa fa-trash');
    $('.actionBtn').removeClass('btn-success');
    $('.actionBtn').addClass('btn-danger');
    $('.actionBtn').addClass('delete-main');
    $('.modal-title').text('Delete');
    $('.did').text($(this).data('id'));
    $('.deleteContent').show();
    $('.form-edit').hide();
    $('.form-add').hide();
    $('#Main-Cat').modal('show');
});

$('.modal-footer').on('click', '.delete-main', function () {
    $.ajax({
        type: 'post',
        url: '/admin/delMainCat',
        data: {
            '_token': $('input[name=_token]').val(),
            'id': $('.did').text()
        },
        success: function (data) {
            $('#main-item' + $('.did').text()).remove();

        }
    });
});

$(document).on('click', '.edit-main-modal', function () {
    $('#footer_action_button').text(" Update");
    $('#footer_action_button').addClass('fa fa-pencil');
    $('#footer_action_button').removeClass('fa fa-trash');
    $('.actionBtn').addClass('btn-success');
    $('.actionBtn').removeClass('btn-danger');
    $('.actionBtn').addClass('edit');
    $('.modal-title').text('Edit');
    $('.deleteContent').hide();
    $('.form-add').hide();
    $('.form-edit').show();
    $('#fid').val($(this).data('id'));
    $('#n').val($(this).data('name'));
    $('#desc').val($(this).data('description'));
    $('#Main-Cat').modal('show');
});

$('.modal-footer').on('click', '.edit', function () {
    $.ajax({
        type: 'post',
        url: '/admin/editMainCat',
        data: {
            '_token': $('input[name=_token]').val(),
            'id': $("#fid").val(),
            'name': $('#n').val(),
        },
        success: function (data) {
            $('#main-item' + data.id).replaceWith(
                "<tr id='main-item" + data.id + "'>" +
                "<td><a href='" + data.url + "'>" + data.name + "</a></td><td>" + data.item_count + "</td>" +
                "<td><button class='edit-main-modal btn btn-info' data-id='" + data.id + "' data-name='" + data.name + "'>" +
                "<span class='fa fa-pencil'></span> Edit</button>" +
                "<button class='delete-main-modal btn btn-danger' data-id='" + data.id + "'>" +
                "<span class='fa fa-trash'></span> Delete </button> </td> </tr>"
            );

        }
    });
});
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-==-=-=-=- END CATEGORIES  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- SUB CATEGORIES SECTION  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */
$('.add-sub-modal').on('click', function () {
    $('#add-Sub-Modal').modal();
});

$(document).on('click', '#edit-sub', function () {
    $('#subCat_id').val($(this).data('id'));
    $('#subCat_name').val($(this).data('name'));
    $('#subCat_description').val($(this).data('description'));
    $('#avatar').attr('src', "/data/" + $(this).data('avatar'));
    $('#editSubCatModal').modal();
});

$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var whichForm = $(this).closest('form').attr('id');

    if (whichForm.indexOf("subCategoryModal") >= 0) {
        var currentPostID = whichForm.substring(17);
        $.ajax({
            url: '/admin/addSubCat',
            type: 'post',
            data: new FormData($('#' + whichForm)[0]),
            contentType: false,
            cache: false,
            processData: false,
            timeout: 3000,
            success: function (data) {
                $('#subCategories').append(
                    "<tr class='sub-item" + currentPostID + "'>" +
                    "<td><a title='" + data.name + "' href='" + data.image_url + "'>" +
                    "<img src='" + data.image_url + "' alt='' width='50'>" +
                    " </a></td>" +
                    "<td><a href='" + data.url + "'>" + data.name + "</a></td>" +
                    "<td>" + data.item_count + "</td>" +
                    "<td><button class='edit-sub-modal btn btn-info' data-id='" + data.id + "' data-name='" + data.name + "' >" +
                    "<span class='fa fa-pencil'></span> Edit</button> " +
                    "<button class='delete-sub-modal btn btn-danger' data-id='" + data.id + "'>" +
                    "<span class='fa fa-trash'></span> Delete</button>" +
                    "</td>" +
                    "</tr>");
                $('#add-Sub-Modal').modal('toggle');
                console.log(data);
            }
        });
    }

    else if (whichForm.indexOf("editSubCat") >= 0) {
        $.ajax({
            url: '/admin/editSubCat',
            type: 'post',
            data: new FormData($('#' + whichForm)[0]),
            contentType: false,
            cache: false,
            processData: false,
            timeout: 3000,
            success: function (data) {
                $('#sub-item' + data.id).replaceWith(
                    "<tr id='sub-item" + data.id + "'>" +
                    "<td><a title='" + data.name + "' href='" + data.image_url + "'>" +
                    "<img src='" + data.image_url + "' alt='' width='50'></a></td>" +
                    "<td><a href='" + data.url + "'>" + data.name + "</a></td> <td>" + data.item_count + "</td> <td>" +
                    "<button id='edit-sub' class='btn btn-info' data-id='" + data.id + "' data-name='" + data.name + "'" +
                    " data-description='" + data.description + "' data-avatar='" + data.avatar + "'>Edit</button>" +
                    "<div class='modal fade' id='editSubCatModal' role='dialog'>" +
                    "<div class='modal-dialog'>" +
                    "<form method='POST' action='" + data.form_action + "' accept-charset='UTF-8' id='editSubCat'>" +
                    "<input name='_token' type='hidden' value='" + token + "'>" +
                    "<input type='hidden' name='subCat' id='subCat_id'>" +
                    "<div class='modal-content'><div class='modal-header'>" +
                    "<button type='button' class='close' data-dismiss='modal'>×</button>" +
                    "<h4 class='modal-title'>Edit SubCategory: " + data.name + "</h4></div>" +
                    "<div class='modal-body'><div class='form-group'><label for='product_name'>Name</label>" +
                    "<input class='form-control' name='subCat_name' id='subCat_name' placeholder='Sub Cat Name...' type='text'>" +
                    "</div> <div class='form-group'> <label for='subCat_description'>Description</label>" +
                    "<textarea class='form-control' name='subCat_description' id='subCat_description' placeholder='Sub Cat Description...'></textarea>" +
                    "</div> <div class='form-group'> <label for='subCat_Image'>Avatar</label>" +
                    "<img id='avatar' width='100'> <input name='subCat_image' id='subCat_image' type='file'>" +
                    "</div> </div> <div class='modal-footer'>" +
                    "<input class='btn btn-primary' type='submit' value='Edit Cat'>" +
                    "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
                    "</div> </div> </form></div></div>" +
                    "<button class='delete-sub-modal btn btn-danger' data-id='" + data.id + "'>" +
                    "<span class='fa fa-trash'></span> Delete </button> </td> </tr>"
                );
                $('#editSubCatModal').modal('toggle');
            }
        });
    }
});

$(document).on('click', '.delete-sub-modal', function () {
    $('#footer_action_button').text(" Delete");
    $('#footer_action_button').removeClass('glyphicon-check');
    $('#footer_action_button').addClass('glyphicon-trash');
    $('.actionBtn').removeClass('btn-success');
    $('.actionBtn').addClass('btn-danger');
    $('.actionBtn').addClass('delete');
    $('.modal-title').text('Delete');
    $('.did').text($(this).data('id'));
    $('.deleteContent').show();
    $('.form-horizontal').hide();
    $('#Sub-Modal').modal('show');
});

$('.modal-footer').on('click', '.delete', function () {
    $.ajax({
        type: 'post',
        url: '/admin/delSubCat',
        data: {
            '_token': $('input[name=_token]').val(),
            'id': $('.did').text()
        },
        success: function (data) {
            $('#sub-item' + data.id).remove();
        }
    });
});

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-==-=-=-=- END SUB CATEGORIES  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- CATEGORIES ITEMS SECTION  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */
$(document).on('click', '.delete-modal', function () {
    $('#footer_action_button').text(" Delete");
    $('#footer_action_button').addClass('fa-trash');
    $('.actionBtn').addClass('btn-danger');
    $('.actionBtn').addClass('delete');
    $('.modal-title').text('Delete');
    $('.did').text($(this).data('id'));
    $('.deleteContent').show();
    $('#myModal').modal('show');
});

$('.modal-footer').on('click', '.delete', function () {
    $.ajax({
        type: 'post',
        url: '/admin/deleteCatItem',
        data: {
            '_token': $('input[name=_token]').val(),
            'id': $('.did').text()
        },
        success: function (data) {
            $('.item' + $('.did').text()).remove();
        }
    });
});

$('#add-sub-item-btn').on('click', function () {
    $('#add-sub-item-modal').modal();
});

$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var whichForm = $(this).closest('form').attr('id');
    if (whichForm.indexOf("addSubItemModal") >= 0) {

        $.ajax({
            url: '/admin/addCatItem',
            type: 'post',
            data: new FormData($('#' + whichForm)[0]),
            contentType: false,
            cache: false,
            processData: false,
            timeout: 3000,
            success: function (data) {

                $('#catItemTable').append(
                    "<tr align='left' class='item" + data.id + "'><td><a title='" + data.name + "' href='" + data.url + "'><img src='" + data.url + "' alt='' width='60' class='portfolio-img pretty-box'> </a> <td> <button class='delete-modal btn btn-danger' data-id='" + data.id + "'> <span class='glyphicon glyphicon-trash'></span> Delete </button> </td></tr>"
                );
                console.log(data);
            }
        });
    }
});

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-==-=-=-=- END SUB CATEGORIES  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Users SECTION  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */

$('#add_user_modal').on('click', function () {
    $('#add-user-Modal').modal();
});

$('#reset-pass-btn').on('click', function () {
    $('#footer_action_button').text(" Reset Password");
    $('#footer_action_button').addClass('fa fa-unlock');
    $('#footer_action_button').removeClass('fa fa-trash');
    $('#footer_action_button').removeClass('fa fa-pencil');
    $('.actionBtn').addClass('btn-warning');
    $('.actionBtn').removeClass('btn-danger');
    $('.actionBtn').addClass('change-password');
    $('.modal-title').text('Reset Password');
    $('.password-user-form').show();
    $('#uid').val($(this).data('id'));
    $('#username').text($(this).data('name'));

    $('#password-user-Modal').modal();
});

$('.edit-user-btn').on('click', function () {
    $('#footer_action_button').text(" Update");
    $('#footer_action_button').addClass('fa fa-pencil');
    $('#footer_action_button').removeClass('fa fa-unlock');
    $('#footer_action_button').removeClass('fa fa-trash');
    $('.actionBtn').addClass('btn-warning');
    $('.actionBtn').removeClass('btn-danger');
    $('.actionBtn').addClass('edit-user');
    $('.modal-title').text('Edit');
    $('.edit-user-form').show();
    $('#uid').val($(this).data('id'));
    $('#uname').val($(this).data('name'));
    $('#umail').val($(this).data('email'));
    $('#urole').val($(this).data('role'));
    $('#edit-user-Modal').modal();
});

$('.modal-footer').on('click', '.edit-user', function () {
    $.ajax({
        type: 'post',
        url: '/admin/editUser',
        data: {
            '_token': $('input[name=_token]').val(),
            'id': $("#uid").val(),
            'name': $("#uname").val(),
            'email': $('#umail').val(),
            'role': $('#urole').val()
        },
        success: function (data) {
            $('#user-item-' + data.id).replaceWith(
                "<tr align='left' id='user-item-" + data.id + "'><td>" + data.name + "</td><td>" + data.email + "</td><td>" +
                +data.role + "</td>" +
                "<td> <button class='edit-user-btn btn btn-info' data-id='" + data.id + "' data-name='" + data.name + "' data-role='" + data.role + "'" +
                " data-email='" + data.email + "'><span class='fa fa-pencil'></span> Edit</button><button id='reset-pass' class='btn btn-warning' data-id='" + data.id + "'>" +
                "<i class='fa fa-lock'></i> Reset Password</button><button class='delete-user-modal btn btn-danger' data-id='" + data.id + "'><span class='fa fa-trash'>" +
                "</span> Delete</button></td>"
            );
        }
    });
});

$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var whichForm = $(this).closest('form').attr('id');
    if (whichForm == 'newUserForm') {
        $.ajax({
            url: '/admin/addUser',
            type: 'post',
            data: new FormData($('#newUserForm')[0]),
            contentType: false,
            cache: false,
            processData: false,
            timeout: 3000,
            success: function (data) {
                if (data.auth = "owner") {
                    $('#usersTable').append(
                        "<tr align='left' id='user-item-" + data.id + "'><td>" + data.name + "</td><td>" + data.email + "</td><td>" +
                        +data.role + "</td>" +
                        "<td> <button class='edit-user-btn btn btn-info' data-id='" + data.id + "' data-name='" + data.name + "' data-role='" + data.role + "'" +
                        " data-email='" + data.email + "'><span class='fa fa-pencil'></span> Edit</button><button id='reset-pass' class='btn btn-warning' data-id='" + data.id + "'>" +
                        "<i class='fa fa-lock'></i> Reset Password</button><button class='delete-user-modal btn btn-danger' data-id='" + data.id + "'><span class='fa fa-trash'>" +
                        "</span> Delete</button></td>"
                    );
                } else {
                    $('#usersTable').append(
                        "<tr align='left' class='user-item-" + data.id + "'><td>" + data.name + "</td><td>" + data.email + "</td><td>" +
                        +data.role + "</td>"
                    );
                }

                $('#add-user-Modal').modal('toggle');
                console.log(data);
            }
        });
    }
});

$(document).on('click', '.delete-user-modal', function () {
    $('#footer_action_button').text(" Delete");
    $('#footer_action_button').addClass('fa fa-trash');
    $('.actionBtn').addClass('btn-danger');
    $('.actionBtn').addClass('delete');
    $('.modal-title').text('Delete');
    $('.did').text($(this).data('id'));
    $('.deleteContent').show();
    $('#myModal').modal('show');
});

$('.modal-footer').on('click', '.delete', function () {
    $.ajax({
        type: 'post',
        url: '/admin/deleteUser',
        data: {
            '_token': $('input[name=_token]').val(),
            'id': $('.did').text()
        },
        success: function (data) {
            $('.item' + $('.did').text()).remove();
        }
    });
});

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-==-=-=-=- END USERS  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Members SECTION  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */

$(document).on('click', '.delete-member-modal', function () {
    $('#footer_action_button').text(" Delete");
    $('#footer_action_button').addClass('glyphicon-trash');
    $('.actionBtn').addClass('btn-danger');
    $('.actionBtn').addClass('delete');
    $('.modal-title').text('Delete');
    $('.did').text($(this).data('id'));
    $('.deleteContent').show();
    $('#myModal').modal('show');
});

$('.modal-footer').on('click', '.delete', function () {
    $.ajax({
        type: 'post',
        url: '/admin/delMember',
        data: {
            '_token': $('input[name=_token]').val(),
            'id': $('.did').text()
        },
        success: function (data) {
            $('#member-item' + $('.did').text()).remove();
        }
    });
});

$('#add-member-modal').on('click', function () {
    $('#add-member-Modal').modal();
});

$(document).on('click', '.edit-member', function () {
    $('#member_id').val($(this).data('id'));
    $('#member_name').val($(this).data('name'));
    $('#member_description').val($(this).data('description'));
    $('#member_job').val($(this).data('job'));
    $('#member_phone').val($(this).data('phone'));
    $('#member_address').val($(this).data('address'));
    $('#avatar').attr('src', "/data/members/" + $(this).data('avatar'));
    $('#editMemberModal').modal();
});

$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var whichForm = $(this).closest('form').attr('id');
    console.log(whichForm);
    if (whichForm == 'newMemberForm') {
        $.ajax({
            url: '/admin/addMember',
            type: 'post',
            data: new FormData($('#newMemberForm')[0]),
            contentType: false,
            cache: false,
            processData: false,
            timeout: 3000,
            success: function (data) {
                console.log(data);
                $('#add-member-Modal').modal('toggle');

                $('#membersTable').append(
                    "<tr align='left' id='member-item" + data.id + "'>" +
                    "<td><a title='" + data.name + "' href='" + data.avatar_url + "'><img src='" + data.avatar_url + "' alt='' width='50'></a> </td>" +
                    "<td>" + data.name + "</td>" +
                    "<td>" + data.job + "</td>" +
                    "<td>" + data.phone + "</td>" +
                    "<td>" + data.address + "</td>" +
                    "<td>" + data.description + "</td><td>" +
                    "<button class='edit-member btn btn-info' data-id='" + data.id + "' data-description='" + data.description + "' data-name='" + data.name + "' data-phone='" + data.phone + "'" +
                    " data-avatar='" + data.avatar + "' data-address='" + data.address + "' data-job='" + data.job + "'>" +
                    "<span class='fa fa-pencil'></span> Edit </button>" +
                    "<div class='modal fade' id='editMemberModal' role='dialog'>" +
                    "<div class='modal-dialog'>" +
                    "<form method='POST' action='" + data.form_action + "' accept-charset='UTF-8' id='editMember'>" +
                    "<input name='_token' type='hidden' value='" + token + "'>" +
                    "<input type='hidden' name='member' id='member_id'><div class='modal-content'><div class='modal-header'>" +
                    "<button type='button' class='close' data-dismiss='modal'>×</button><h4 class='modal-title'>Edit Member</h4></div>" +
                    "<div class='modal-body'><div class='form-group'><label for='member_name'>Name</label>" +
                    "<input class='form-control' name='member_name' id='member_name' placeholder='member Name...' type='text'>" +
                    "</div><div class='form-group'><label for='member_description'>Description</label>" +
                    "<textarea class='form-control' name='member_description' id='member_description' placeholder='member Description...'></textarea>" +
                    "</div><div class='form-group'><label for='member_address'>Address</label>" +
                    "<input name='member_address' id='member_address' type='text'></div> <div class='form-group'>" +
                    "<label for='member_phone'>Phone</label><input name='member_phone' id='member_phone' type='text'></div>" +
                    "<div class='form-group'><label for='member_job'>Job</label><input name='member_job' id='member_job' type='text'>" +
                    "</div> <div class='form-group'><label for='member_avatar'>Avatar</label>" +
                    "<img id='avatar' width='100'>" +
                    "<input name='member_avatar' id='member_avatar' type='file'></div></div><div class='modal-footer'>" +
                    "<input class='btn btn-primary' type='submit' value='Edit member'>" +
                    "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
                    "</div></div></form></div></div>" +
                    "<button class='delete-member-modal btn btn-danger' data-id='" + data.id + "'>" +
                    "<span class='fa fa-trash'></span> Delete</button></td></tr>"
                );
            }
        });
    }

    else if (whichForm.indexOf("editMember") >= 0) {
        $.ajax({
            url: '/admin/editMember',
            type: 'post',
            data: new FormData($('#' + whichForm)[0]),
            contentType: false,
            cache: false,
            processData: false,
            timeout: 3000,
            success: function (data) {
                $('#member-item'+ data.id).replaceWith(
                    "<tr align='left' id='member-item" + data.id + "'>" +
                    "<td><a title='" + data.name + "' href='" + data.image + "'><img src='" + data.image + "' alt='' width='50'></a> </td>" +
                    "<td>" + data.name + "</td>" +
                    "<td>" + data.job + "</td>" +
                    "<td>" + data.phone + "</td>" +
                    "<td>" + data.address + "</td>" +
                    "<td>" + data.description + "</td><td>" +
                    "<button class='edit-member btn btn-info' data-id='" + data.id + "' data-description='" + data.description + "' data-name='" + data.name + "' data-phone='" + data.phone + "'" +
                    " data-avatar='" + data.avatar + "' data-address='" + data.address + "' data-job='" + data.job + "'>" +
                    "<span class='fa fa-pencil'></span> Edit </button>" +
                    "<div class='modal fade' id='editMemberModal' role='dialog'>" +
                    "<div class='modal-dialog'>" +
                    "<form method='POST' action='" + data.form_action + "' accept-charset='UTF-8' id='editMember'>" +
                    "<input name='_token' type='hidden' value='" + token + "'>" +
                    "<input type='hidden' name='member' id='member_id'><div class='modal-content'><div class='modal-header'>" +
                    "<button type='button' class='close' data-dismiss='modal'>×</button><h4 class='modal-title'>Edit Member</h4></div>" +
                    "<div class='modal-body'><div class='form-group'><label for='member_name'>Name</label>" +
                    "<input class='form-control' name='member_name' id='member_name' placeholder='member Name...' type='text'>" +
                    "</div><div class='form-group'><label for='member_description'>Description</label>" +
                    "<textarea class='form-control' name='member_description' id='member_description' placeholder='member Description...'></textarea>" +
                    "</div><div class='form-group'><label for='member_address'>Address</label>" +
                    "<input name='member_address' id='member_address' type='text'></div> <div class='form-group'>" +
                    "<label for='member_phone'>Phone</label><input name='member_phone' id='member_phone' type='text'></div>" +
                    "<div class='form-group'><label for='member_job'>Job</label><input name='member_job' id='member_job' type='text'>" +
                    "</div> <div class='form-group'><label for='member_avatar'>Avatar</label>" +
                    "<img id='avatar' width='100'>" +
                    "<input name='member_avatar' id='member_avatar' type='file'></div></div><div class='modal-footer'>" +
                    "<input class='btn btn-primary' type='submit' value='Edit member'>" +
                    "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
                    "</div></div></form></div></div>" +
                    "<button class='delete-member-modal btn btn-danger' data-id='" + data.id + "'>" +
                    "<span class='fa fa-trash'></span> Delete</button></td></tr>"
                );
                $('#editMemberModal').modal('toggle');
            }
        });
    }
});

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-==-=-=-=- END MEMBERS  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- E-MAILS SECTION  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */

$(document).on('click', '.delete-modal', function () {
    $('#footer_action_button').text(" Delete");
    $('#footer_action_button').addClass('glyphicon-trash');
    $('.actionBtn').addClass('btn-danger');
    $('.actionBtn').addClass('delete');
    $('.modal-title').text('Delete');
    $('.did').text($(this).data('id'));
    $('.deleteContent').show();
    $('#myModal').modal('show');
});

$('.modal-footer').on('click', '.delete', function () {
    $.ajax({
        type: 'post',
        url: '/admin/delMail',
        data: {
            '_token': $('input[name=_token]').val(),
            'id': $('.did').text()
        },
        success: function (data) {
            $('#item-table-' + $('.did').text()).remove();
        }
    });
});

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-==-=-=-=- END E-MAILS -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--= */