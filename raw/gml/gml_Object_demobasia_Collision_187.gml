/// gml_Object_demobasia_Collision_187
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(iessa, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 500, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            mon = mon + -500;
        }
        action_create_object(impacasa1r, 0, 0);
        with (demobachia) {
            action_kill_object();
        }
        with (demoiessa) {
            action_kill_object();
        }
        with (disegnaprezzo) {
            action_kill_object();
        }
        action_kill_object();
    }
}
action_set_relative(0);
