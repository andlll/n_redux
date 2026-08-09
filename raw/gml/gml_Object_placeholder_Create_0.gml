/// gml_Object_placeholder_Create_0
// locals: __b__
action_sprite_set(empty, 0, 1);
close = 0;
making = 0;
auta = 0;
ult = 0;
scrolling = 0;
de = 0;
act = 0;
action_set_alarm(200, 1);
__b__ = action_if_variable(act, 0, 0);
if (__b__) {
    __b__ = action_if_number(736, 0, 0);
    if (!__b__) {
        act = 1;
    }
}
