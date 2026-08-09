// gml_Object_d234_Step_0  locals=2 args=0 len=916
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x211E004
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x211E004
00000040: b 0x211E00C
00000044: popenv 0x411DFC8
00000048: b 0x211E010
0000004C: popenv 0x1D1E00C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x211E0E8
00000060: push.imm.e 156
00000064: pushenv 0x211E064
00000068: push.imm.e 3
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v ele
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x211E064
000000A0: b 0x211E06C
000000A4: popenv 0x411E028
000000A8: b 0x211E070
000000AC: popenv 0x1D1E06C
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x211E0E8
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.v trans
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x211E0E8
000000F8: push.imm.e 1
000000FC: pop.v.i bout
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 518
00000118: conv.i.v
0000011C: call action_sprite_set(argc=3)
00000124: popz
00000128: push.imm.e 455
0000012C: pushenv 0x211E12C
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: push.v night
00000148: call action_if_variable(argc=3)
00000150: pop.v.v local.__b__
00000158: push.local.v local.__b__
00000160: conv.v.b
00000164: bf 0x211E12C
00000168: b 0x211E134
0000016C: popenv 0x411E0F0
00000170: b 0x211E138
00000174: popenv 0x1D1E134
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x211E22C
00000188: push.imm.e 156
0000018C: pushenv 0x211E18C
00000190: push.imm.e 4
00000194: conv.i.v
00000198: push.imm.e 0
0000019C: conv.i.v
000001A0: push.v ele
000001A8: call action_if_variable(argc=3)
000001B0: pop.v.v local.__b__
000001B8: push.local.v local.__b__
000001C0: conv.v.b
000001C4: bf 0x211E18C
000001C8: b 0x211E194
000001CC: popenv 0x411E150
000001D0: b 0x211E198
000001D4: popenv 0x1D1E194
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x211E22C
000001E8: push.imm.e 0
000001EC: conv.i.v
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: push.v trans
00000200: call action_if_variable(argc=3)
00000208: pop.v.v local.__b__
00000210: push.local.v local.__b__
00000218: conv.v.b
0000021C: bf 0x211E22C
00000220: push.imm.e -1
00000224: conv.i.v
00000228: push.imm.e 92
0000022C: conv.i.v
00000230: push.imm.e 770
00000234: conv.i.v
00000238: call action_sprite_set(argc=3)
00000240: popz
00000244: push.imm.e 0
00000248: conv.i.v
0000024C: push.imm.e 93
00000250: conv.i.v
00000254: call action_set_alarm(argc=2)
0000025C: popz
00000260: push.imm.e 1
00000264: pop.v.i trans
0000026C: push.imm.e 455
00000270: pushenv 0x211E270
00000274: push.imm.e 0
00000278: conv.i.v
0000027C: push.imm.e 0
00000280: conv.i.v
00000284: push.v night
0000028C: call action_if_variable(argc=3)
00000294: pop.v.v local.__b__
0000029C: push.local.v local.__b__
000002A4: conv.v.b
000002A8: bf 0x211E270
000002AC: b 0x211E278
000002B0: popenv 0x411E234
000002B4: b 0x211E27C
000002B8: popenv 0x1D1E278
000002BC: push.local.v local.__b__
000002C4: conv.v.b
000002C8: bf 0x211E354
000002CC: push.imm.e 0
000002D0: conv.i.v
000002D4: push.imm.e 1
000002D8: conv.i.v
000002DC: push.v trans
000002E4: call action_if_variable(argc=3)
000002EC: pop.v.v local.__b__
000002F4: push.local.v local.__b__
000002FC: conv.v.b
00000300: bf 0x211E354
00000304: push.imm.e 0
00000308: conv.i.v
0000030C: push.imm.e 0
00000310: conv.i.v
00000314: push.v bout
0000031C: call action_if_variable(argc=3)
00000324: pop.v.v local.__b__
0000032C: push.local.v local.__b__
00000334: conv.v.b
00000338: bf 0x211E320
0000033C: push.imm.e 1
00000340: conv.i.v
00000344: push.imm.e 0
00000348: conv.i.v
0000034C: push.imm.e 770
00000350: conv.i.v
00000354: call action_sprite_set(argc=3)
0000035C: popz
00000360: push.imm.e 1
00000364: conv.i.v
00000368: push.imm.e 93
0000036C: conv.i.v
00000370: call action_set_alarm(argc=2)
00000378: popz
0000037C: push.imm.e 0
00000380: pop.v.i bout
00000388: push.imm.e 0
0000038C: pop.v.i trans