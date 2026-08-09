/// gml_Object_tradebuttoner_Mouse_4
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(active, 1, 0);
if (__b__) {
    with (r12) {
        selec = 0;
    }
    __b__ = action_if_number(696, 0, 0);
    if (__b__) {
        action_sprite_color(16777215, 0);
        action_set_relative(1);
        action_create_object(tradoscrino, 0, -200);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(get1, 270, -200);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(get2, 270, -150);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(get3, 270, -100);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(get4, 270, -50);
        action_set_relative(0);
        action_set_relative(0);
        exit;
    }
}
action_set_relative(0);
