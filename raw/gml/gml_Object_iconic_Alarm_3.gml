/// gml_Object_iconic_Alarm_3
// locals: __b__
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    action_load_game("nimsavbac");
} else {
    action_load_game("nimsav_easbac");
}
action_another_room(title);
