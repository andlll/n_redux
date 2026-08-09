/// gml_Object_honda_brr12_Alarm_0
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_create_object(honda_brr1, 2907, 1027);
}
