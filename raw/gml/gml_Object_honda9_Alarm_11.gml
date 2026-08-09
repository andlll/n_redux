/// gml_Object_honda9_Alarm_11
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda9, 1298, 945);
}
action_kill_object();
