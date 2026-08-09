/// gml_Object_grutop_Alarm_7
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(gto, 0, 1);
        action_set_alarm(28, 2);
    } else {
        action_sprite_set(gtao, 0, 1);
        action_set_alarm(28, 3);
    }
} else {
    action_set_alarm(52, 7);
}
