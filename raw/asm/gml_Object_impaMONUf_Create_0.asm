// gml_Object_impaMONUf_Create_0  locals=2 args=0 len=600
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2157EF8
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2157EF8
00000040: b 0x2157F00
00000044: popenv 0x4157EBC
00000048: b 0x2157F04
0000004C: popenv 0x1D57F00
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2157F34
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x2157F78
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2157F78
000000C0: b 0x2157F80
000000C4: popenv 0x4157F3C
000000C8: b 0x2157F84
000000CC: popenv 0x1D57F80
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x2157FB4
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.v y
00000108: neg.v.d
0000010C: push.imm.e 3
00000110: sub.i.v
00000114: pop.v.v depth
0000011C: push.imm.e 0
00000120: pop.v.i tic
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: push.imm.e 405
00000134: conv.i.v
00000138: call action_set_alarm(argc=2)
00000140: popz
00000144: push.imm.e 2
00000148: conv.i.v
0000014C: call action_if_dice(argc=1)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x2158098
0000016C: push.imm.e 2
00000170: conv.i.v
00000174: call action_if_dice(argc=1)
0000017C: pop.v.v local.__b__
00000184: push.local.v local.__b__
0000018C: conv.v.b
00000190: bf 0x2158070
00000194: push.imm.e 1
00000198: conv.i.v
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: push.imm.e 295
000001A8: conv.i.v
000001AC: call action_sprite_set(argc=3)
000001B4: popz
000001B8: b 0x2158094
000001BC: push.imm.e 1
000001C0: conv.i.v
000001C4: push.imm.e 0
000001C8: conv.i.v
000001CC: push.imm.e 296
000001D0: conv.i.v
000001D4: call action_sprite_set(argc=3)
000001DC: popz
000001E0: b 0x215810C
000001E4: push.imm.e 2
000001E8: conv.i.v
000001EC: call action_if_dice(argc=1)
000001F4: pop.v.v local.__b__
000001FC: push.local.v local.__b__
00000204: conv.v.b
00000208: bf 0x21580E8
0000020C: push.imm.e 1
00000210: conv.i.v
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 297
00000220: conv.i.v
00000224: call action_sprite_set(argc=3)
0000022C: popz
00000230: b 0x215810C
00000234: push.imm.e 1
00000238: conv.i.v
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: push.imm.e 298
00000248: conv.i.v
0000024C: call action_sprite_set(argc=3)
00000254: popz