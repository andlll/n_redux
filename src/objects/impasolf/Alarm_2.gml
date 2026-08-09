/// gml_Object_impasolf_Alarm_2
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(if13, 0, 1);
    } else {
        action_sprite_set(if14, 0, 1);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(if15, 0, 1);
    } else {
        action_sprite_set(if16, 0, 1);
    }
}
action_set_alarm(40, 5);
