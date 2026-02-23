$(document).ready(function () {
    $.getJSON("formData.json", function (data) {

        $("#formTitle").text(data.formTitle);
        $.each(data.fields, function (i, field) {

            let fieldHTML = '<div class="field">';
            fieldHTML += '<label>' + field.label + '</label>';

            if (field.type === "select") {
                fieldHTML += '<select id="' + field.id + '">';
                fieldHTML += '<option value="">Select</option>';

                $.each(field.options, function (j, opt) {
                    fieldHTML += '<option value="' + opt + '">' + opt + '</option>';
                });
                fieldHTML += '</select>';
            } else {

                fieldHTML += '<input type="' + field.type + '" id="' + field.id + '">';
            }
           fieldHTML += '<div class="error"></div>';
            fieldHTML += '</div>';
            $("#formContainer").append(fieldHTML);
        });

    });
    $(document).on("change", "#country", function () {

        if ($(this).val() === "USA") {
            $("#stateField").show();
            $("#extraSection").show();
        } else {
            $("#stateField").hide();
            $("#extraSection").hide();
        }

    });
    $("#dynamicForm").submit(function (e) {
        e.preventDefault();
        let isValid = true;
        $(".error").text("");
        if ($("#name").val().trim() === "") {
            $("#name").next(".error").text("Name required");
            isValid = false;
        }
        let email = $("#email").val();
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!emailPattern.test(email)) {
            $("#email").next(".error").text("Invalid email");
            isValid = false;
        }
        if ($("#password").val().length < 6) {
            $("#password").next(".error").text("Min 6 characters");
            isValid = false;
        }
        if ($("#country").val() === "") {
            $("#country").next(".error").text("Select country");
            isValid = false;
        }
        if ($("#country").val() === "USA") {

            if ($("#state").val() === "") {
                $("#state").next(".error").text("Select state");
                isValid = false;
            }
            if ($("#zipcode").val().length !== 5) {
                $("#zipcode").next(".error").text("Zip must be 5 digits");
                isValid = false;
            }
        }
       if (isValid) {
            alert("Form Submitted Successfully ✅");
        }
    });

});