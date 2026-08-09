/// gml_Object_imparcor_demo_Create_0
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
depth = -y + 1;
action_set_alarm(30, 0);
action_set_alarm(20, 10);
action_set_relative(1);
action_create_object(imparcof_demo, 0, 0);
action_set_relative(0);
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(ir13, 0, 1);
    } else {
        action_sprite_set(ir14, 0, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(ir15, 0, 1);
    } else {
        action_sprite_set(ir16, 0, 1);
    }
}
action_set_relative(0);
