// gml_Object_rol_diet_Create_0  locals=1 args=0 len=116
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.d 0.4
0000001C: conv.d.v
00000020: push.d 0.4
0000002C: conv.d.v
00000030: call action_sprite_transform(argc=4)
00000038: popz
0000003C: push.v y
00000044: neg.v.d
00000048: push.imm.e 10
0000004C: add.i.v
00000050: pop.v.v depth
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 57
00000064: conv.i.v
00000068: call action_set_alarm(argc=2)
00000070: popz