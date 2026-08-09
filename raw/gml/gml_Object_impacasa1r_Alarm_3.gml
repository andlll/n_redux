/// gml_Object_impacasa1r_Alarm_3
// locals: __b__
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
action_set_alarm(30, 4);
