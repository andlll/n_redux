// gml_Object_positiona_Mouse_57  locals=2 args=0 len=112
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20C0138
00000038: push.v obj140.x
00000040: push.v obj141.x
00000048: sub.v.v
0000004C: pop.v.v des
00000054: push.v obj140.y
0000005C: push.v obj141.y
00000064: sub.v.v
00000068: pop.v.v desy