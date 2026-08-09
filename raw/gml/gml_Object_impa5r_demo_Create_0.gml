/// gml_Object_impa5r_demo_Create_0
// locals: __b__
action_set_relative(0);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(15201023, 1);
}
depth = -y + 3.1;
tic = 0;
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr11, 0, 1);
    } else {
        action_sprite_set(sr12, 0, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr13, 0, 1);
    } else {
        action_sprite_set(sr14, 0, 1);
    }
}
action_set_alarm(30, 0);
action_set_alarm(20, 10);
action_set_relative(1);
action_create_object(impa5f_demo, 0, 0);
action_set_relative(0);
action_set_relative(0);
