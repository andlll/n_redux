/// gml_Object_grutopbig_Alarm_7
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(ggto, 0, 1);
        action_set_alarm(35, 2);
    } else {
        action_sprite_set(ggtao, 0, 1);
        action_set_alarm(35, 3);
    }
} else {
    action_set_alarm(52, 7);
}
