// gml_Object_smoko_aer_Step_0  locals=1 args=0 len=116
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v xsca
0000002C: push.v xsca
00000034: call action_sprite_transform(argc=4)
0000003C: popz
00000040: push.v xsca
00000048: push.d 0.2
00000054: add.d.v
00000058: pop.v.v xsca
00000060: push.imm.e 0
00000064: conv.i.v
00000068: call action_set_relative(argc=1)
00000070: popz