// gml_Object_loadaisi_Create_0  locals=2 args=0 len=116
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21ECF34
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.d 0.89
00000054: conv.d.v
00000058: push.d 0.89
00000064: conv.d.v
00000068: call action_sprite_transform(argc=4)
00000070: popz