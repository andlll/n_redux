/// gml_Object_r22_Alarm_4
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(maghene, 0, 0);
if (__b__) {
    action_create_object(honda32y, 2713, 565);
}
__b__ = action_if_variable(maghene, 1, 0);
if (__b__) {
    action_create_object(honda33, 2417, 755);
}
__b__ = action_if_variable(maghene, 2, 0);
if (__b__) {
    action_create_object(honda34, 3251, 594);
}
__b__ = action_if_variable(maghene, 3, 0);
if (__b__) {
    action_create_object(honda31a, 1909, 447);
}
__b__ = action_if_variable(maghene, 4, 0);
if (__b__) {
    action_create_object(honda32a, 2713, 565);
}
__b__ = action_if_variable(maghene, 5, 0);
if (__b__) {
    action_create_object(honda33a, 2417, 755);
}
__b__ = action_if_variable(maghene, 6, 0);
if (__b__) {
    action_create_object(honda34a, 3251, 594);
}
__b__ = action_if_variable(maghene, 7, 0);
if (__b__) {
    action_create_object(honda31b, 1909, 447);
}
__b__ = action_if_variable(maghene, 8, 0);
if (__b__) {
    action_create_object(honda32b, 2713, 565);
}
__b__ = action_if_variable(maghene, 9, 0);
if (__b__) {
    action_create_object(honda33b, 2417, 755);
}
__b__ = action_if_variable(maghene, 10, 0);
if (__b__) {
    action_create_object(honda34b, 3251, 594);
}
action_set_relative(1);
maghene = maghene + 1;
action_set_relative(0);
action_set_alarm(8750, 4);
action_set_relative(0);
