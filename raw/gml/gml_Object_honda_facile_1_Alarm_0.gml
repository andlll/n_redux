/// gml_Object_honda_facile_1_Alarm_0
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda_facile_1, 1321, 924);
}
action_kill_object();
