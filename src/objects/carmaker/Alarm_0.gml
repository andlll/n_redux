/// gml_Object_carmaker_Alarm_0
// locals: __b__
action_set_relative(0);
action_set_alarm(3600, 0);
__b__ = action_if_variable(made, 2, 0);
if (__b__) {
    action_set_relative(1);
    made = made + 1;
    action_set_relative(0);
    action_create_object(honda3, 1842, 630);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(made, 3, 0);
if (__b__) {
    action_set_relative(1);
    made = made + 1;
    action_set_relative(0);
    action_create_object(honda4, 62, 526);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(made, 4, 0);
if (__b__) {
    action_set_relative(1);
    made = made + 1;
    action_set_relative(0);
    action_create_object(honda5, 1547, 517);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(made, 5, 0);
if (__b__) {
    action_set_relative(1);
    made = made + 1;
    action_set_relative(0);
    action_create_object(honda6, 1856, 643);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(made, 6, 0);
if (__b__) {
    action_set_relative(1);
    made = made + 1;
    action_set_relative(0);
    action_create_object(honda7, 859, 64);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(made, 7, 0);
if (__b__) {
    action_set_relative(1);
    made = made + 1;
    action_set_relative(0);
    action_create_object(honda8, 253, 403);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(made, 8, 0);
if (__b__) {
    action_set_relative(1);
    made = made + 1;
    action_set_relative(0);
    action_create_object(honda9, 1298, 945);
    action_set_relative(0);
    exit;
}
action_set_relative(0);
