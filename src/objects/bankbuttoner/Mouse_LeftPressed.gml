/// gml_Object_bankbuttoner_Mouse_4
// locals: __b__
action_set_relative(0);
with (r12) {
    selec = 0;
}
__b__ = action_if_variable(loaned, 0, 0);
if (__b__) {
    __b__ = action_if_number(696, 0, 0);
    if (__b__) {
        action_sprite_color(16777215, 0);
        action_set_relative(1);
        action_create_object(loanoscrino, 0, -200);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(get_loan1, 270, -200);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(get_loan2, 270, -150);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(get_loan3, 270, -100);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(get_loan4, 270, -50);
        action_set_relative(0);
        action_set_relative(0);
        exit;
    }
}
action_set_relative(0);
