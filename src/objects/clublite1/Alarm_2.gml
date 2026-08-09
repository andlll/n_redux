/// gml_Object_clublite1_Alarm_2
// locals: __b__
action_set_relative(0);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_set_alarm(30, 2);
}
with (r12) {
    action_set_relative(1);
    ele = ele + -20;
    action_set_relative(0);
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_color(5995775, 1);
    } else {
        action_sprite_color(16711935, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_color(8454143, 1);
    } else {
        action_sprite_color(8453888, 1);
    }
}
action_set_relative(0);
