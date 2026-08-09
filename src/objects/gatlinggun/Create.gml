/// gml_Object_gatlinggun_Create_0
// locals: __b__
action_set_relative(0);
amove = 0;
redder = 0;
action_set_relative(1);
action_create_object(ruindeath, 0, 0);
action_set_relative(0);
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
depth = -y;
launching = 1;
ovr = 0;
life = 800;
anmo = 3;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 40;
    action_set_relative(0);
}
spra = 0;
dirk = 0;
__b__ = action_if_number(617, 0, 2);
if (__b__) {
    action_set_alarm(23, 5);
}
direttorio = 0;
action_set_relative(0);
