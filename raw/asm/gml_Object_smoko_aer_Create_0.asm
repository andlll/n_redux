// gml_Object_smoko_aer_Create_0  locals=2 args=0 len=200
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x21D98F8
00000028: push.imm.e 1
0000002C: conv.i.v
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 1348
0000003C: conv.i.v
00000040: call action_sprite_set(argc=3)
00000048: popz
0000004C: b 0x21D991C
00000050: push.imm.e 1
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 1349
00000064: conv.i.v
00000068: call action_sprite_set(argc=3)
00000070: popz
00000074: push.imm.e 2
00000078: pop.v.i xsca
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 2
00000094: conv.i.v
00000098: push.imm.e 2
0000009C: conv.i.v
000000A0: call action_sprite_transform(argc=4)
000000A8: popz
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 36
000000B8: conv.i.v
000000BC: call action_set_alarm(argc=2)
000000C4: popz