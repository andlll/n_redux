/// gml_Object_grutop_Alarm_0
// locals: __b__
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(grutop2, 0, 1);
    } else {
        action_sprite_set(grutop3, 0, 1);
    }
} else {
    action_sprite_set(grutop1, 0, 1);
}
action_set_alarm(36, 0);
