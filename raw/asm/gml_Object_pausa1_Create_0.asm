// gml_Object_pausa1_Create_0  locals=1 args=0 len=108
// locals: arguments
00000000: push.imm.e -100
00000004: conv.i.v
00000008: push.imm.e -100
0000000C: conv.i.v
00000010: call action_move_to(argc=2)
00000018: popz
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 100
00000030: conv.i.v
00000034: push.imm.e 100
00000038: conv.i.v
0000003C: call action_sprite_transform(argc=4)
00000044: popz
00000048: push.imm.e 0
0000004C: conv.i.v
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.imm.e 136
0000005C: conv.i.v
00000060: call action_create_object(argc=3)
00000068: popz