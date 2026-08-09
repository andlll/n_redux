// gml_Object_impa4f_demo_Create_0  locals=2 args=0 len=608
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x21D3754
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21D3754
00000040: b 0x21D375C
00000044: popenv 0x41D3718
00000048: b 0x21D3760
0000004C: popenv 0x1DD375C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x21D3790
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x21D37D4
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x21D37D4
000000C0: b 0x21D37DC
000000C4: popenv 0x41D3798
000000C8: b 0x21D37E0
000000CC: popenv 0x1DD37DC
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x21D3810
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.v y
00000108: neg.v.d
0000010C: push.d 2.8
00000118: add.d.v
0000011C: pop.v.v depth
00000124: push.imm.e 0
00000128: pop.v.i tic
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 45
0000013C: conv.i.v
00000140: call action_set_alarm(argc=2)
00000148: popz
0000014C: push.imm.e 2
00000150: conv.i.v
00000154: call action_if_dice(argc=1)
0000015C: pop.v.v local.__b__
00000164: push.local.v local.__b__
0000016C: conv.v.b
00000170: bf 0x21D38FC
00000174: push.imm.e 2
00000178: conv.i.v
0000017C: call action_if_dice(argc=1)
00000184: pop.v.v local.__b__
0000018C: push.local.v local.__b__
00000194: conv.v.b
00000198: bf 0x21D38D4
0000019C: push.imm.e 1
000001A0: conv.i.v
000001A4: push.imm.e 0
000001A8: conv.i.v
000001AC: push.imm.e 1127
000001B0: conv.i.v
000001B4: call action_sprite_set(argc=3)
000001BC: popz
000001C0: b 0x21D38F8
000001C4: push.imm.e 1
000001C8: conv.i.v
000001CC: push.imm.e 0
000001D0: conv.i.v
000001D4: push.imm.e 1128
000001D8: conv.i.v
000001DC: call action_sprite_set(argc=3)
000001E4: popz
000001E8: b 0x21D3970
000001EC: push.imm.e 2
000001F0: conv.i.v
000001F4: call action_if_dice(argc=1)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x21D394C
00000214: push.imm.e 1
00000218: conv.i.v
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: push.imm.e 1129
00000228: conv.i.v
0000022C: call action_sprite_set(argc=3)
00000234: popz
00000238: b 0x21D3970
0000023C: push.imm.e 1
00000240: conv.i.v
00000244: push.imm.e 0
00000248: conv.i.v
0000024C: push.imm.e 1130
00000250: conv.i.v
00000254: call action_sprite_set(argc=3)
0000025C: popz