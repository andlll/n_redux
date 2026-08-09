/// gml_Object_recogn_Create_0
// locals: __b__
action_set_relative(0);
life = 0.8;
__b__ = action_if_dice(2);
if (__b__) {
    action_set_motion(30, 11);
} else {
    action_set_motion(30, 13);
}
depth = -3990;
desto = 1;
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
action_set_alarm(550, 0);
action_set_alarm(23, 5);
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_move_to(-200, 0);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_move_to(-370, 0);
        action_set_relative(0);
    }
}
action_set_relative(0);
