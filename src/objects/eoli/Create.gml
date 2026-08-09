/// gml_Object_eoli_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
with (r12) {
    action_set_relative(1);
    hap = hap + -20;
    action_set_relative(0);
}
depth = -y;
action_sprite_set(eol, 0, 0.25);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(15201023, 1);
}
with (r12) {
    action_set_relative(1);
    wewe = wewe + 200;
    action_set_relative(0);
}
action_set_alarm(30, 0);
life = 800;
action_set_alarm(23, 5);
action_set_relative(0);
