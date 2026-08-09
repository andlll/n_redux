/// gml_Object_resetrelotto_Mouse_4
// locals: __b__
with (rainlauncher) {
    action_kill_object();
}
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    action_load_game("nimsavbac");
}
__b__ = action_if_number(736, 1, 0);
if (__b__) {
    action_load_game("nimsav_easbac");
}
