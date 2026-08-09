/// gml_Object_salvador_Alarm_0
// locals: __b__
__b__ = action_if_number(8, 0, 0);
if (__b__) {
    __b__ = action_if_number(7, 0, 0);
    if (__b__) {
        __b__ = action_if_number(736, 0, 0);
        if (__b__) {
            action_save_game("nimsavbac");
        } else {
            action_save_game("nimsav_easbac");
        }
    }
}
action_kill_object();
