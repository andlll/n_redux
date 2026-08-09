// gml_Object_hapware_Create_0  locals=1 args=0 len=144
// locals: arguments
00000000: call window_get_width(argc=0)
00000008: pop.v.v proto1
00000010: call window_get_height(argc=0)
00000018: pop.v.v proto2
00000020: push.v proto1
00000028: push.v proto2
00000030: cmp.v.v >
00000034: bf 0x213B5D4
00000038: push.imm.e 0
0000003C: pop.v.i global.upp
00000044: b 0x213B5E0
00000048: push.imm.e 40
0000004C: pop.v.i global.upp
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.d 0.62
00000070: conv.d.v
00000074: push.d 0.62
00000080: conv.d.v
00000084: call action_sprite_transform(argc=4)
0000008C: popz